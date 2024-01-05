import AudioRecorderPlayer from 'react-native-audio-recorder-player';

class AudioRecorder {
    public audio = new AudioRecorderPlayer();

    public async startRecording() {
        await this.audio.startRecorder();
    }

    public async stopRecording() {
        const result = await this.audio.stopRecorder();
        return result;
    }

    public async startPlaying() {
        return await this.audio.startPlayer();
    }

    public async stopPlaying() {
        return await this.audio.stopPlayer();
    }

}

export default new AudioRecorder();