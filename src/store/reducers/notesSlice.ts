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
		// createNote: {
		// 	reducer: (state, action: PayloadAction<NoteData>) => {
		// 		state.push(action.payload);
		// 	},
		// 	prepare: (note: NoteData) => {
		// 		const id = nanoid();
		// 		const tags = note.tags.map(tag => { id: tag.value, label: tag.label })
		// 		return { payload: { id, ...note, tags } };
		// 	}
		// },

		removeNote(state, action: PayloadAction<UniqueId>) {
			state = state.filter(note => note.id !== action.payload);
		},
		updateNote(state, action: PayloadAction<Note>) {
			state = state.map(note => {
				if (note.id === action.payload.id) {
					return { ...note, ...action.payload };
				} else {
					return note;
				}
			});
		}
	}
});

export const { createNote, removeNote, updateNote } = notesSlice.actions;

export default notesSlice.reducer;
