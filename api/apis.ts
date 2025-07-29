const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default {
    user: {
        user: "users",
        getBySSOId: (id: string | number) => `users/sso/${id}`,
        getById: (id: string | number) => `users/${id}`,
    },
    common: {
        upload: "file/upload",
        imageUrl: (name: string) => `${baseUrl}/file/download/${name}`,
    }
}