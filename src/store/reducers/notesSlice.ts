import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Note, NoteData, UniqueId } from '../../types/types';

const initialState: Note[] = [];

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		createNote(state, action: PayloadAction<NoteData>) {
			state.push({
				id: nanoid(),
				...action.payload
			});
		},
		deleteNote(state, action: PayloadAction<UniqueId>) {
			return state.filter(note => note.id !== action.payload);
		},
		updateNote(state, action: PayloadAction<Note>) {
			return state.map(note => {
				if (note.id === action.payload.id) {
					return { ...note, ...action.payload };
				} else {
					return note;
				}
			});
		},
		filterNotesWithTags(state, action: PayloadAction<UniqueId>) {
			return state.filter(note => {
				return !note.tags.some(tag => {
					return tag.id === action.payload;
				});
			});
		}
	}
});

export const { createNote, deleteNote, updateNote, filterNotesWithTags } = notesSlice.actions;

export default notesSlice.reducer;
