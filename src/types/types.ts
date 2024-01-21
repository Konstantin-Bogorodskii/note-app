export type UniqueId = string;

export type Note = {
	id: string;
} & NoteData;

export type NoteData = {
	title: string;
	markdown: string;
	tags: Tag[];
};

export type Tag = {
	id: string;
	label: string;
};

export type PartialNote = {
	id: string;
} & Partial<NoteData>;
