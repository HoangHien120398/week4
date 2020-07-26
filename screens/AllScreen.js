import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { 
    StyleSheet,
    Text,
    View, 
    ImageBackground,
    Alert,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Button
} from 'react-native';
import {TODOS} from '../utils/data.js'
import {} from '@react-navigation/native'

const TodoItem = props => {
    const buttonStyle = {
        backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
    }

    return (
        <TouchableOpacity
         key={props.todo.body} 
         style={[styles.todoItem, buttonStyle]}
         onPress= {() => {onLongPress}}
          >
            <Text style={styles.todoText} >
                {props.idx + 1} : {props.todo.body}
            </Text>
            
        </TouchableOpacity>
    );
};

export default function AllScreen() {

  // const [todoList, setTodoList] = useState(TODOS);
  // const onToggleTodo = id => {
  //   const todo = todoList.find(todo => todo.id === id);
  //   todo.status = todo.status === 'Done' ? 'Active' : 'Done';
  //   const foundIndex = todoList.findIndex(todo => todo.id === id);
  //   todoList[foundIndex] = todo;
  //   const newTodoList = [...todoList];
  //   setTodoList(newTodoList);
  // };

  const onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };

  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => props.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };

  const [todoBody, setTodoBody] = useState('');
  const onSubmitTodo = () => {
    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setTodoBody('');
  };

  return (
    <View style={styles.container}>
        {/* <ImageBackground source={require('../assets/note.png')} style={styles.imageBackground} >
          <ScrollView contentContainerStyle={styles.container}>
          {TODOS.map((todo, idx)=>{
             return <TodoItem key={todo.body} todo ={todo} idx={idx} />
         })
         }
         <TextInput style={styles.input} />
         <Button>
           <Text> Submit </Text>
         </Button>
          </ScrollView>

        </ImageBackground> */}
        <ScrollView contentContainerStyle={styles.container}>
          {TODOS.map((todo, idx)=>{
             return 
             <TodoItem 
             key={todo.body} 
             todo ={todo} 
             idx={idx} 
             onDeleteTodo={onDeleteTodo}
             />
         })
         }
         <TextInput 
         style={styles.input}  
         value={todoBody}
         onChangeText={text => setTodoBody(text)}
         />
         <TouchableOpacity style={styles.submitButton} onPress={onSubmitTodo} >
           <Text style={styles.submitText} > Submit </Text>
         </TouchableOpacity>
        
          </ScrollView>
    </View>
  );
}

// AllScreen.navigationOptions = {
//     title: 'All Todos'
// }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    margin: 30,
    alignContent:'center',
    justifyContent:'center'
  },
  // imageBackground: {
  //     width: 350,
  //       flex: 1,
  //       resizeMode: 'cover',
  //       justifyContent:'center',
        
  //   },
    todoItem: {
        margin: 5,
        padding: 10,
        width: '95%',
        minHeight: 20,
        borderRadius: 8,
        flexWrap: 'wrap'
      },
      todoText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
      },
      input: {
        width: '95%',
        minHeight: 30,
        color: 'white',
        borderWidth: 3,
        marginTop: '20%',
        marginBottom: '5%',
        borderColor: 'grey',
        borderRadius: 10
      },
      submitButton: {
        height: 50,
        width: '40%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'blue',
        justifyContent: 'center'
      }
});
