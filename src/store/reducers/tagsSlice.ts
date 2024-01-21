import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag, UniqueId } from '../../types/types';

const initialState: Tag[] = [];

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		createTag(state, action: PayloadAction<Tag>) {
			state.push(action.payload);
		},
		deleteTag(state, action: PayloadAction<UniqueId>) {
			return state.filter(tag => tag.id !== action.payload);
		},
		updateTag(state, action: PayloadAction<Tag>) {
			return state.map(tag => {
				if (tag.id === action.payload.id) {
					return { ...tag, label: action.payload.label };
				} else {
					return tag;
				}
			});
		}
	}
});

export const { createTag, deleteTag, updateTag } = tagsSlice.actions;

export default tagsSlice.reducer;
