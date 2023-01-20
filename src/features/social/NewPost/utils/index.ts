import type React from "react";

export const getFileFromInput = (e: React.ChangeEvent<HTMLInputElement>): Promise<File> => new Promise((resolve, reject) => {
    const { files } = e.target;

    if (!files) {
        return;
    }

    const file = files[0];

    if (!file) {
        return;
    }

    resolve(file);
});
