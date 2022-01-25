import React, { useMemo, useState } from 'react';
import { dataJSON } from './data.js';
import { ItemContext } from './components/ItemContext';
import Item from './components/Item';

export interface IDataObject {
    id: string;
    isActive: boolean;
    picture: string;
    age: number;
    name: string;
    email: string;
    address: string;
    about: string;
    registered: string;
}

function App() {
	const [dataObject, setDataObject] = useState<IDataObject[]>(dataJSON);
	const [showColumn, setshowColumn] = useState<boolean>(false);

	const saveFile = () => {
		const downloadToFile = (dataObject: IDataObject[], filename: string, contentType: string) => {
			const a = document.createElement('a');
			const file = new Blob([JSON.stringify(dataObject)], { type: contentType });
			a.href = URL.createObjectURL(file); a.download = filename; a.click();
			URL.revokeObjectURL(a.href);
		};
		downloadToFile(dataObject, 'my-new-file.txt', 'text/plain');
	};

	const providerValue = useMemo(() => ({ dataObject, setDataObject }), [dataObject, setDataObject]);

	return (
		<div className="app-page">
			{dataObject.map((item, index) => (
				<ItemContext.Provider value={providerValue} key={item.id}>
					<Item
						key={item.id}
						item={item}
						index={index}
						showColumn={showColumn}
					/>

				</ItemContext.Provider>
			))}

			<div className="button-wrapper d-flex justify-center">
				<button type="button" className="m-r-10" onClick={saveFile}>Save JSON file</button>
				<button type="button" onClick={() => setshowColumn(!showColumn)}>{`Show results in ${showColumn ? 'rows' : 'columns'}`}</button>
			</div>
		</div>
	);
}

export default App;
