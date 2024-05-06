import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../../redux/slices/todosSlice';
import AppStyle from '../../theme';
import TodoItem from '../../component/TodoItem';

const HomeScreen = () => {
    const todos = useSelector((state) => state.todos.todos);
    const dispatch = useDispatch();
    const [expandedItemId, setExpandedItemId] = useState(null);

    const handleItemPress = (itemId) => {
        if (expandedItemId === itemId) {
            setExpandedItemId(null);
        } else {
            setExpandedItemId(itemId);
        }
    };

    const handleAddItem = () => {
        const currentDate = new Date();
        const day = currentDate.getDate(); // Lấy ngày hiện tại (từ 1 đến 31)
        const month = currentDate.getMonth() + 1; // Lấy tháng hiện tại (từ 0 đến 11, cộng thêm 1 để đổi thành từ 1 đến 12)
        const year = currentDate.getFullYear(); // Lấy năm hiện tại
    
        // Định dạng ngày tháng năm theo "dd/MM/yyyy"
        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    
        const newTodo = {
            id: Math.random().toString(),
            title: 'Công việc mới',
            time: formattedDate, // Sử dụng ngày tháng năm đã định dạng
        };
    
        dispatch(addTodo(newTodo));
    };
    

    const renderItem = ({ item }) => {
        return (
            <TodoItem
                item={item}
                onPress={() => handleItemPress(item.id)}
                activeOpacity={1}
            />
        );
    };

    return (
        <View style={AppStyle.HomeScreenStyle.container}>
            <View style={AppStyle.HomeScreenStyle.tabView}>
                <Text style={AppStyle.HomeScreenStyle.titleStyle}>To do list</Text>
            </View>
            <View style={AppStyle.HomeScreenStyle.bodyView}>
                <FlatList
                    data={todos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 350 }} // Padding dưới cùng của FlatList
                />
            </View>
            <TouchableOpacity style={AppStyle.HomeScreenStyle.addButton} onPress={handleAddItem}>
                <Text style={AppStyle.HomeScreenStyle.buttonText}>Tạo task mới</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;
