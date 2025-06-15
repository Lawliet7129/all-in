interface PeerConnection {
  peerId: string
  connection: RTCPeerConnection
  stream: MediaStream
}

class WebRTCService {
  private peerConnections: Map<string, PeerConnection> = new Map()
  private localStream: MediaStream | null = null
  private socket: any // TODO: Replace with proper socket type

  constructor(socket: any) {
    this.socket = socket
    this.setupSocketListeners()
  }

  private setupSocketListeners() {
    this.socket.on('offer', this.handleOffer.bind(this))
    this.socket.on('answer', this.handleAnswer.bind(this))
    this.socket.on('ice-candidate', this.handleIceCandidate.bind(this))
  }

  async initialize() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  async createPeerConnection(peerId: string) {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        // Add your TURN server configuration here
      ],
    }

    const connection = new RTCPeerConnection(configuration)
    const peerConnection: PeerConnection = {
      peerId,
      connection,
      stream: this.localStream!,
    }

    this.peerConnections.set(peerId, peerConnection)

    // Add local stream tracks to the connection
    this.localStream?.getTracks().forEach((track) => {
      connection.addTrack(track, this.localStream!)
    })

    // Handle ICE candidates
    connection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('ice-candidate', {
          peerId,
          candidate: event.candidate,
        })
      }
    }

    // Handle incoming tracks
    connection.ontrack = (event) => {
      const peerConnection = this.peerConnections.get(peerId)
      if (peerConnection) {
        peerConnection.stream = event.streams[0]
      }
    }

    return connection
  }

  private async handleOffer(data: { peerId: string; offer: RTCSessionDescriptionInit }) {
    const connection = await this.createPeerConnection(data.peerId)
    await connection.setRemoteDescription(new RTCSessionDescription(data.offer))
    const answer = await connection.createAnswer()
    await connection.setLocalDescription(answer)
    this.socket.emit('answer', { peerId: data.peerId, answer })
  }

  private async handleAnswer(data: { peerId: string; answer: RTCSessionDescriptionInit }) {
    const peerConnection = this.peerConnections.get(data.peerId)
    if (peerConnection) {
      await peerConnection.connection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      )
    }
  }

  private async handleIceCandidate(data: {
    peerId: string
    candidate: RTCIceCandidateInit
  }) {
    const peerConnection = this.peerConnections.get(data.peerId)
    if (peerConnection) {
      await peerConnection.connection.addIceCandidate(
        new RTCIceCandidate(data.candidate)
      )
    }
  }

  async call(peerId: string) {
    const connection = await this.createPeerConnection(peerId)
    const offer = await connection.createOffer()
    await connection.setLocalDescription(offer)
    this.socket.emit('offer', { peerId, offer })
  }

  disconnect(peerId: string) {
    const peerConnection = this.peerConnections.get(peerId)
    if (peerConnection) {
      peerConnection.connection.close()
      this.peerConnections.delete(peerId)
    }
  }

  disconnectAll() {
    this.peerConnections.forEach((peerConnection) => {
      peerConnection.connection.close()
    })
    this.peerConnections.clear()
    this.localStream?.getTracks().forEach((track) => track.stop())
    this.localStream = null
  }
}

export default WebRTCService 