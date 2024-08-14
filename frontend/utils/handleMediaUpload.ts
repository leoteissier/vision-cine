const handleMediaUpload = (event: Event, selectedMedia: { value: File | null }) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        selectedMedia.value = input.files[0];
    } else {
        selectedMedia.value = null;
    }
};

export default handleMediaUpload;