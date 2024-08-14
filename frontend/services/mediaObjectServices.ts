import api from './api';

export default {
    async uploadMedia(MediaData: any) {
        const formData = new FormData();
        formData.append('file', MediaData);

        return api('/media_objects', {
            method: 'POST',
            body: formData
        });
    }
}
