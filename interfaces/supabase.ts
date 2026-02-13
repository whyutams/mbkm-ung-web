export type UserRole = 'superadmin' | 'user';

export interface General { 
    id: string;
    name: string;
    data: string;
}

export interface Viewer { 
    id: string;
    ip: string;
    post_id: string | null;
    created_at: string;
}

export interface Profile {
    id: string;
    username: string;
    full_name: string;
    nim: string;
    year: number;
    major: string | null;
    study_program: string | null;
    avatar_url: string | null;
    bio: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    instagram_url: string | null;
    role: UserRole | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    content: any | null;
    description: string | null;
    thumbnail_url: string | null;
    is_published: boolean;
    created_by: {
        full_name: string;
        username: string;
        avatar_url: string | null;
        nim: string;
    };
    updated_by: {
        full_name: string;
        username: string;
        avatar_url: string | null;
    } | null;
    created_at: string;
    updated_at: string;

}
