import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, Animated, Image, TextInput } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from '../redux/slices/todosSlice';
import Icons from '../assest/icons';
import AppStyle from '../theme';
import { Dropdown } from 'react-native-element-dropdown';


const TodoItem = ({ item }) => {
    const animatedHeight = useRef(new Animated.Value(100)).current;
    const translationX = useRef(new Animated.Value(0)).current;
    const [isChecked, setIsChecked] = useState(item.status === 1);
    const [isEditing, setIsEditing] = useState(false);
    const opacityValue = useRef(new Animated.Value(1)).current; // Giá trị opacity ban đầu là 1 (không mờ)
    const [showTimeInfo, setShowTimeInfo] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [newTitle, setNewTitle] = useState(item.title);
    const [newTime, setNewTime] = useState(item.time);
    const [newPriority, setNewPriority] = useState(item.priorityLevel);

    const priorityOptions = [
        { label: 'Cao', value: 1 },
        { label: 'Trung bình', value: 2 },
        { label: 'Thấp', value: 3 },
    ];

    const dispatch = useDispatch();

    const getPriorityText = (priorityLevel) => {
        switch (priorityLevel) {
            case 1:
                return <Text style={{ color: 'red' }}>Ưu tiên cao</Text>;
            case 2:
                return <Text style={{ color: 'orange' }}>Ưu tiên trung bình</Text>;
            case 3:
                return <Text style={{ color: 'green' }}>Ưu tiên thấp</Text>;
            default:
                return <Text style={{ color: 'gray' }}>Không xác định</Text>;
        }
    };

    function parseDateString(dateString) {
        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }

    function getRelativeTime(dateString) {
        const currentDate = new Date();
        const targetDate = parseDateString(dateString);
        const timeDiff = targetDate.getTime() - currentDate.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (dayDiff < 0) {
            return <Text style={{ color: 'red' }}>Đã quá hạn</Text>;
        } else if (dayDiff === 0) {
            return <Text style={{ color: 'green' }}>Hôm nay</Text>;
        } else if (dayDiff === 1) {
            return "Còn 1 ngày";
        } else {
            return `Còn ${dayDiff} ngày`;
        }
    }

    const handleCheckboxChange = (newState) => {
        setIsChecked(newState);
        const updatedTodo = { ...item, status: newState ? 1 : 0 };
        dispatch(editTodo(updatedTodo));
    };

    useEffect(() => {
        return () => {
            animatedHeight.removeAllListeners();
        };
    }, []);

    const expandView = () => {
        Animated.timing(animatedHeight, {
            toValue: 300,
            duration: 700,
            useNativeDriver: false,
        }).start();
        moveText();
        setIsEditing(true); // Đặt biến state isEditing thành true khi mở rộng view
        setShowTimeInfo(false); // Ẩn phần thông tin thời gian khi mở rộng view
        setIsExpanded(true); // Đặt biến state isExpanded thành true khi mở rộng view

        // Áp dụng hiệu ứng mờ dần và ẩn cho checkbox
        Animated.timing(opacityValue, {
            toValue: 0, // Giá trị opacity cuối cùng là 0 (ẩn hoàn toàn)
            duration: 500, // Thời gian để thực hiện hiệu ứng (0.5 giây)
            useNativeDriver: true, // Sử dụng native driver để tối ưu hiệu suất
        }).start();
    };

    const closeView = () => {
        Animated.timing(animatedHeight, {
            toValue: 100,
            duration: 500,
            useNativeDriver: false,
        }).start();
        closeText();
        setIsEditing(false); // Đặt biến state isEditing thành false khi thu nhỏ view
        setShowTimeInfo(true); // Ẩn phần thông tin thời gian khi mở rộng view
        setIsExpanded(false); // Đặt biến state isExpanded thành false khi thu nhỏ view

        Animated.timing(opacityValue, {
            toValue: 1, // Giá trị opacity cuối cùng là 1 (hiển thị lại hoàn toàn)
            duration: 500, // Thời gian để thực hiện hiệu ứng (0.5 giây)
            useNativeDriver: true, // Sử dụng native driver để tối ưu hiệu suất
        }).start();
    };

    const handleDeleteItem = () => {
        dispatch(deleteTodo(item.id)); // Gửi action deleteTodo với id của mục công việc cần xoá
    };

    const editButton = () => {
        expandView();
    };
    
    const moveText = () => {
        Animated.timing(translationX, {
            toValue: -25,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    const closeText = () => {
        Animated.timing(translationX, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    const handlePriorityChange = (value) => {
        setNewPriority(value);
    };

    const handleSaveChanges = () => {
        // Kiểm tra xem newPriority có tồn tại và có giá trị không
        if (!newPriority || newPriority.value === undefined) {
            // Hiển thị thông báo khi mức độ ưu tiên không được chọn
            Alert.alert(
                'Thông báo',
                'Vui lòng chọn mức độ ưu tiên!',
                [
                    {
                        text: 'Đóng',
                        onPress: () => console.log('Đóng Pressed'), // Thực hiện hành động khi người dùng nhấn nút Đóng
                        style: 'cancel',
                    },
                ]
            );
            return; 
        }

        const updatedTodo = {
            id: item.id,
            title: newTitle,
            time: newTime,
            priorityLevel: newPriority.value,
        };

        dispatch(editTodo(updatedTodo));
        closeView();
    };

    return (
        <Animated.View style={[AppStyle.TodoItemStyles.container, { height: animatedHeight }]}>
            <View style={AppStyle.TodoItemStyles.itemContainer}>
                <View style={AppStyle.TodoItemStyles.itemContainerView}>
                    <View style={AppStyle.TodoItemStyles.checkboxView}>
                        <Animated.View
                            style={[
                                AppStyle.TodoItemStyles.checkboxIcon,
                                { opacity: opacityValue } // Áp dụng giá trị opacity từ animated value
                            ]}
                        >
                            <BouncyCheckbox
                                isChecked={isChecked}
                                onPress={(isChecked) => handleCheckboxChange(isChecked)}
                                fillColor="#ca5bbb"
                                disableText={true}
                                iconComponentStyle={AppStyle.TodoItemStyles.checkboxIcon}
                            />
                        </Animated.View>
                    </View>
                    <Animated.View style={[{ transform: [{ translateX: translationX }] }, AppStyle.TodoItemStyles.titleView]}>
                        {isEditing ? (
                            <TextInput
                                style={AppStyle.TodoItemStyles.textInputTitleStyle}
                                value={newTitle}
                                onChangeText={text => setNewTitle(text)} // Cập nhật giá trị newTime khi người dùng thay đổi
                                autoFocus={true}
                            />
                        ) : (
                            <Text style={AppStyle.TodoItemStyles.titleText}>{item.title}</Text>
                        )}
                    </Animated.View>
                    <View style={AppStyle.TodoItemStyles.editButtonView}>
                        {isExpanded ? (
                            <TouchableOpacity onPress={handleDeleteItem}>
                                <Image style={[AppStyle.TodoItemStyles.editButtonIcon , {tintColor: "red", height: 25, width: 25}]} source={Icons.DeleteIcon} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={editButton}>
                                <Image style={[AppStyle.TodoItemStyles.editButtonIcon]} source={Icons.EditIcon} />
                            </TouchableOpacity>
                        )}
                    </View>

                </View>
                {
                    showTimeInfo && (
                        <View style={AppStyle.TodoItemStyles.infoContainerView}>
                            <View style={AppStyle.TodoItemStyles.priorityView}>
                                <Text style={AppStyle.TodoItemStyles.renderItemTimeText}>{getPriorityText(item.priorityLevel)}</Text>
                            </View>
                            <View
                                style={AppStyle.TodoItemStyles.timeView}
                            >
                                <Text style={AppStyle.TodoItemStyles.renderItemTimeText}>
                                    {getRelativeTime(item.time)}
                                </Text>
                            </View>
                        </View>
                    )
                }


                {isEditing && ( // Hiển thị nút "Close" khi đang chỉnh sửa
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: 'black',
                        }} />
                        <View style={AppStyle.TodoItemStyles.inputContainer}>

                            <Text style={AppStyle.TodoItemStyles.inputLabel}>Thời hạn</Text>
                            <TextInput
                                style={AppStyle.TodoItemStyles.textInput}
                                placeholder="27/11/2022"
                                value={newTime}
                                onChangeText={text => setNewTime(text)} // Cập nhật giá trị newTime khi người dùng thay đổi
                            />
                        </View>

                        <View style={AppStyle.TodoItemStyles.inputContainer}>

                            <Text style={AppStyle.TodoItemStyles.inputLabel}>Mức độ ưu tiên</Text>
                            <View style={AppStyle.TodoItemStyles.dropdownView}>
                                <Dropdown
                                    style={[AppStyle.TodoItemStyles.dropdown, newPriority]}
                                    placeholderStyle={AppStyle.TodoItemStyles.placeholderStyle}
                                    selectedTextStyle={AppStyle.TodoItemStyles.selectedTextStyle}
                                    inputSearchStyle={AppStyle.TodoItemStyles.inputSearchStyle}
                                    iconStyle={AppStyle.TodoItemStyles.iconStyle}
                                    data={priorityOptions}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!newPriority || newPriority.value === undefined ? 'Chọn' : newPriority.label}
                                    onChange={handlePriorityChange}
                                />

                            </View>
                        </View>
                        <TouchableOpacity style={AppStyle.TodoItemStyles.saveButtomStyle} onPress={handleSaveChanges}>
                            <Text style={AppStyle.TodoItemStyles.saveButtomText}>Xong</Text>
                        </TouchableOpacity>
                    </View>
                )}


            </View>
        </Animated.View>
    );
};


export default TodoItem;
