import MediaObjectServices from "~/services/mediaObjectServices";

export default function useMediaUpload() {

    const selectedMedia = ref([]);
    async function handleMediaUpload(file: File): Promise<string> {
        try {
            const response = await MediaObjectServices.uploadMedia(file);
            return response['@id']; // Renvoyer l'ID du média uploadé
        } catch (error) {
            console.error('Error while uploading media:', error);
            return ''; // Gérer l'erreur comme il convient
        }
    };

    return {
        selectedMedia,
        handleMediaUpload,
    }
}

