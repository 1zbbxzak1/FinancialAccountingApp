export function userPhotoIsCorrect(image: File): boolean {
    const maxSizeInBytes: number = 1048576;
    const allowedType: string = 'jpg';

    const imageType: string = image.name.split('.').pop()!;

    const sizeIsCorrect: boolean = image.size <= maxSizeInBytes;
    const typeIsCorrect: boolean = imageType === allowedType;

    return sizeIsCorrect && typeIsCorrect;
}
