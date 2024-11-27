import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export const dynamic = "force-static";
export const revalidate = false;

async function fetchSongs() {
    const songsDirectory = path.join(process.cwd(), "public", "songs");
    const songsList = await fs.readdir(songsDirectory);
    const songs = songsList
        .filter((file) => file.endsWith(".mp3"))
        .map((song) => ({
            title: song.replace(".mp3", ""),
            src: `/songs/${song}`,
        }));

    return songs;
}

export async function GET() {
    try {
        const songs = await fetchSongs();
        return NextResponse.json(songs);
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to load songs: ${error}` },
            { status: 500 }
        );
    }
}
