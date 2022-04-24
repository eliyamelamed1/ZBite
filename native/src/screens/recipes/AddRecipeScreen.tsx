import * as React from 'react';

import { Button, Text, View } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import UIButton from '../../UI/UIButton';
import UITextInput from '../../UI/UITextInput';

type PropsType = {
    navigation: {
        navigate: (path: string) => void;
    };
};
export default function AddRecipeScreen({ navigation }: PropsType) {
    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        cookTime: '',
        serving: '',
    });
    const { title, description, cookTime, serving } = formData;
    const onChangeText = (value: string, field: string) =>
        setFormData((prevState) => ({ ...prevState, [field]: value }));

    const [ingredients, setIngredients] = React.useState([
        {
            title: '',
        },
    ]);
    const [instructions, setInstructions] = React.useState([
        {
            title: '',
        },
    ]);

    const handleChange = (e, i) => {
        const { value } = e.target;
        ingredients[i].title = value;
        setIngredients([...ingredients]);
    };

    const addTextBoxes = (setState: any) => {
        setState((prevState: any) => [
            ...prevState,
            {
                title: '',
            },
        ]);
    };
    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Add recipe Image</Text>
                <UITextInput placeholder='Title' onChangeText={(title) => onChangeText(title, 'title')} value={title} />
                <UITextInput
                    placeholder='Description'
                    onChangeText={(description) => onChangeText(description, 'description')}
                    value={description}
                />
                <UITextInput
                    placeholder='Cook Time'
                    onChangeText={(cookTime) => onChangeText(cookTime, 'cookTime')}
                    value={cookTime}
                />
                <UITextInput
                    placeholder='Serving'
                    onChangeText={(serving) => onChangeText(serving, 'serving')}
                    value={serving}
                />

                <Title>Ingredients</Title>
                {ingredients.map((obj, index) => {
                    const { title } = obj;

                    return <UITextInput key={index} placeholder='2 Onions' value={title} />;
                })}
                <UIButton title='Add Ingredient' onPress={() => addTextBoxes(setIngredients)} />
                <Title>Instructions</Title>
                {instructions.map((obj, index) => {
                    const Instruction = obj.title;
                    return <UITextInput key={index} placeholder='Add the Onions to the mixture' value={Instruction} />;
                })}
                <UIButton title='Add Instruction' onPress={() => addTextBoxes(setInstructions)} />
            </View>
        </ScrollView>
    );
}
