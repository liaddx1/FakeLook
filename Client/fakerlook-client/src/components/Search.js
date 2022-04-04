import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption, ComboboxList } from "@reach/combobox";
import "./Search.css"
const Search = (props) => {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 31.726870, lng: () => 34.992470, },
            radius: 100 * 1000,

        },
    });

    return (
        <Combobox onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();

            try {
                const results = await getGeocode({ address });
                const { lat, lng } = await getLatLng(results[0]);
                props.updateLocation({ lat, lng });
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }}>
            <ComboboxInput
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                disabled={!ready}
                placeholder="Enter An Address"
                className='center-text'
            />
            <ComboboxPopover className='mt-2'>
                <ComboboxList>
                    {status === "OK" && data.map(({ id, description }) => (<ComboboxOption key={Math.random().toString()} value={description} />))}
                </ComboboxList>
            </ComboboxPopover>

        </Combobox>
    );
}

export default Search;