import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { setFolder } from '../actions/index.js';

export default function Dropdown() {
    const currentFolder = useSelector(state => state.images.folder)
    const folders = useSelector(state => state.images.folder_list)
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()

    function renderItem({ item }) {
        return <TouchableOpacity onPress={ () => dispatch(setFolder(item)) }>
            <View style={{ padding: 12, borderBottomColor: 'black', borderBottomWidth: 1 }} >
                <Text>{ item }</Text>
            </View>
        </TouchableOpacity>
    }

    return <View style={{ overflow: 'visible', zIndex: 1000, alignItems: 'center' }}>
        <TouchableOpacity onPress={ () => setOpen(!open) }>
            <View 
                style={{ 
                    padding: 12, 
                    backgroundColor: 'green', 
                    alignItems: 'center', 
                    height: 48, 
                    margin: 12, 
                    borderRadius: 8, 
                    justifyContent: 'center',
                }} 
            >
                <Text>Folder: { currentFolder } v</Text>
            </View>
        </TouchableOpacity>
        { open ? 
            (<FlatList 
                style={{ backgroundColor: 'white', position: 'absolute', top: 60, width: '60%' }}
                data={ folders } 
                extraData={{ dispatch }}
                renderItem={ renderItem } />) : 
            null 
        }
    </View>
}
