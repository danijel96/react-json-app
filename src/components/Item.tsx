import React, { useContext, useState } from 'react';
import { IDataObject } from '../App';
import { ItemContext } from './ItemContext';

interface IItem {
    item: IDataObject;
    index: number;
    showColumn: boolean;
}
function Item({
	item, index, showColumn,
}: IItem) {
	const registeredDate = item.registered.split('T');

	const { dataObject, setDataObject } = useContext(ItemContext);

	const [oneItem, setOneItem] = useState(item);
	const [edit, setEdit] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
		const { name } = e.target;

		if (name === 'isActive') {
			const activeValue = e.target.value === 'true';
			setOneItem({ ...oneItem, [name]: activeValue });
		}
		if (name !== 'isActive') {
			setOneItem({ ...oneItem, [name]: e.target.value });
		}

		// First code before edit/save button, change property immediately while typing and all inputs are enabled, but it slows down performance and speed
		// const item: IDataObject = dataObject[index];
		// if (name === 'isActive') {
		//	item[name] = e.target.value === 'true';
		// } else {
		//	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//	// @ts-ignore
		//	item[name] = e.target.value;
		// }
		// const newObject = [
		//	...dataObject,
		// ];
		// setDataObject(newObject);
	};

	const handleEditSave = () => {
		if (edit) {
			const newArray = dataObject.map((el: IDataObject, idx: number) => {
				if (idx === index) {
					return oneItem;
				} return el;
			});

			setDataObject(newArray);
		}
		setEdit(!edit);
	};
	return (
		<div className="item-wrapper d-flex justify-center">

			<div className={`item-row m-r-10 ${showColumn ? 'flex-column' : ''}`} key={item.id}>

				<div className="input-wrapper id">
					<div className="prop-value">
						<p className="bold m-r-10">ID:</p>
						<p>{item.id}</p>
					</div>
				</div>

				<div className="input-wrapper name">
					<div className="prop-value w-200">
						<p className="bold m-r-10">Name:</p>
						<p>{item.name}</p>

					</div>
					<div className="edit-wrapper">
						<input
							type="text"
							name="name"
							defaultValue={item.name}
							onChange={e => handleChange(e, index)}
							disabled={!edit}
						/>
					</div>
				</div>

				<div className="input-wrapper address">
					<div className="prop-value w-300">
						<p className="bold m-r-10">Address:</p>
						<p>{item.address}</p>
					</div>
					<div className="edit-wrapper">
						<input
							type="text"
							name="address"
							defaultValue={item.address}
							onChange={e => handleChange(e, index)}
							disabled={!edit}
						/>
					</div>
				</div>

				<div className="input-wrapper email">
					<div className="prop-value w-300">
						<p className="bold m-r-10">Email:</p>
						<p>{item.email}</p>
					</div>
					<div className="edit-wrapper">
						<input
							type="email"
							name="email"
							defaultValue={item.email}
							onChange={e => handleChange(e, index)}
							disabled={!edit}
						/>
					</div>
				</div>

				<div className="input-wrapper age">
					<div className="prop-value w-100">
						<p className="bold m-r-10">Age:</p>
						<p>{item.age}</p>
					</div>
					<div className="edit-wrapper">
						<input
							type="number"
							name="age"
							defaultValue={item.age}
							onChange={e => handleChange(e, index)}
							disabled={!edit}
						/>
					</div>
				</div>

				<div className="input-wrapper about">
					<div className="prop-value about w-700">
						<p className="bold m-r-10 w-55">About:</p>
						<p>{item.about}</p>
					</div>
					<div className="edit-wrapper">
						<textarea
							name="about"
							id="about"
							cols={30}
							rows={7}
							onChange={e => handleChange(e, index)}
							defaultValue={item.about}
							disabled={!edit}
						/>
					</div>
				</div>
				<div className="input-wrapper registered">
					<div className="prop-value w-200">
						<p className="bold m-r-10">Registered:</p>
						<p>{registeredDate[0] && registeredDate[0]}</p>
					</div>
					<div className="edit-wrapper">

						<input
							type="date"
							name="registered"
							defaultValue={registeredDate[0]}
							onChange={e => handleChange(e, index)}
							disabled={!edit}
						/>
					</div>
				</div>

				<div className="input-wrapper isActive">
					<div className="prop-value w-150">
						<p className="bold m-r-10">Is Active:</p>
						<p>{item.isActive ? 'Yes' : 'No'}</p>
					</div>
					<div className="edit-wrapper d-flex">
						<div className="d-flex align-center">
							<label htmlFor="isActiveTrue" className="pointer">
								<input
									type="radio"
									name="isActive"
									value="true"
									id="isActiveTrue"
									defaultChecked={item.isActive === true}
									onChange={e => handleChange(e, index)}
									disabled={!edit}
								/>
								True
							</label>
						</div>
						<div className="d-flex align-center">
							<label htmlFor="isActiveFalse" className="pointer">
								<input
									type="radio"
									name="isActive"
									value="false"
									id="isActiveFalse"
									defaultChecked={item.isActive === false}
									onChange={e => handleChange(e, index)}
									disabled={!edit}
								/>
								False
							</label>
						</div>
					</div>
				</div>
			</div>
			<div className="edit-button-wrapper d-flex align-center">
				<button
					className={`${edit ? 'save' : 'edit'}`}
					type="button"
					onClick={() => handleEditSave()}
				>
					{edit ? 'Save' : 'Edit'}
				</button>

			</div>
		</div>
	);
}

export default Item;
