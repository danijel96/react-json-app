/* eslint-disable no-useless-escape */
import React, { useContext, useState } from 'react';
import { IDataObject } from '../App';
import { ItemContext } from './ItemContext';

interface IItem {
  item: IDataObject;
  index: number;
  showColumn: boolean;
}
function Item({ item, index, showColumn }: IItem) {
	const { dataObject, setDataObject } = useContext(ItemContext);

	const [oneItem, setOneItem] = useState(item);
	const [edit, setEdit] = useState(false);

	const handleChange = (
		e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
		value: number | string | boolean,
		number?:boolean
	) => {
		const { name } = e.target;

		let targetValue;

		// validation because of stupid JS bug when typing in input type number he return string and change input from type number to text
		if (number) {
			targetValue = Number(e.target.value);
		} else {
			targetValue = e.target.value;
		}

		if (typeof value === 'boolean') {
			const activeValue = targetValue === 'true';
			setOneItem({ ...oneItem, [name]: activeValue });
		} else {
			setOneItem({ ...oneItem, [name]: targetValue });
		}
	};

	const handleEditSave = () => {
		if (edit) {
			const newArray = dataObject.map((el: IDataObject, idx: number) => {
				if (idx === index) {
					return oneItem;
				}
				return el;
			});

			setDataObject(newArray);
		}
		setEdit(!edit);
	};

	const renderType = (value: number | string) => {
		let type = 'text';

		if (typeof value === 'number') type = 'number';
		if (typeof value === 'string') {
			const validDate = value.match('[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}');
			if (Array.isArray(validDate)) {
				type = 'date';
			} else {
				type = 'text';
			}
		}

		return type;
	};

	const renderValue = (value: number | string) => {
		let valueInput;

		if (typeof value === 'string') {
			const validDate = value.match('[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}');
			if (Array.isArray(validDate)) {
				const date = validDate[0];
				valueInput = date;
			} else {
				valueInput = value;
			}
		} else {
			valueInput = value;
		}
		return valueInput;
	};

	const renderInputs = (key: string, value: number | string | boolean) => {
		if (key === 'id' || key === 'ID') {
			return null;
		}
		if (Array.isArray(value)) {
			return null;
		}
		if (typeof value === 'string' && value.length > 100) {
			return (
				<textarea
					name={key}
					id={key}
					cols={30}
					rows={7}
					onChange={e => handleChange(e, value)}
					defaultValue={value}
					disabled={!edit}
				/>
			);
		}
		if (typeof value === 'boolean') {
			return (
				<div className="edit-wrapper d-flex">
					<div className="d-flex align-center">
						<label htmlFor="isActiveTrue" className="pointer">
							<input
								type="radio"
								name={key}
								value="true"
								id="isActiveTrue"
								defaultChecked={value === true}
								onChange={e => handleChange(e, value)}
								disabled={!edit}
							/>
							True
						</label>
					</div>
					<div className="d-flex align-center">
						<label htmlFor="isActiveFalse" className="pointer">
							<input
								type="radio"
								name={key}
								value="false"
								id="isActiveFalse"
								defaultChecked={value === false}
								onChange={e => handleChange(e, value)}
								disabled={!edit}
							/>
							False
						</label>
					</div>
				</div>
			);
		}
		// do this part of code dinamically in next return
		// if (typeof value === 'number') {
		//    return (
		//        <input
		//            type='number'
		//            name={key}
		//            defaultValue={value}
		//            onChange={e => handleChange(e, index, value, true)}
		//            disabled={!edit}
		//        />
		//    )
		// }
		return (
			<input
				type={renderType(value)}
				name={key}
				defaultValue={renderValue(value)}
				onChange={(e) => {
					typeof value === 'number'
						? handleChange(e, value, true)
						: handleChange(e, value);
				}}
				disabled={!edit}
			/>
		);
	};

	return (
		<div className="item-wrapper d-flex justify-center">
			<div
				className={`item-row m-r-10 ${showColumn ? 'flex-column' : ''}`}
				key={item.id}
			>
				{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
				{Object.entries(oneItem).map(([key, value]: any) => (
					<div key={key} className="m-r-10">
						<div className={`input-wrapper ${key}`}>
							<div className={`prop-value ${key} min-w-200`}>
								<p className="bold m-r-10">
									{key}
									:
								</p>
								<p>{typeof value === 'boolean' ? String(value) : renderValue(value)}</p>
							</div>
						</div>
						<div className="edit-wrapper">{renderInputs(key, value)}</div>
					</div>
				))}
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
