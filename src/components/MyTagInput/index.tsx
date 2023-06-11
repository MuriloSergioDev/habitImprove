import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';

const TagInput = ({initialTags, onTagsChange}: any) => {
  const [tags, setTags] = useState<any>(initialTags);
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    if (inputValue.trim() !== '') {
      const updatedTags = [...tags, inputValue.trim()];
      setTags(updatedTags);
      setInputValue('');
      onTagsChange(updatedTags); // Chama a função callback passando as tags atualizadas
    }
  };

  const handleRemoveTag = (index: React.Key | null | undefined) => {
    const updatedTags = tags.filter((_: any, i: any) => i !== index);
    setTags(updatedTags);
    onTagsChange(updatedTags); // Chama a função callback passando as tags atualizadas
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {tags.map((tag: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRemoveTag(index)}
            style={{
              backgroundColor: '#EDEDED',
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 6,
              marginRight: 8,
              marginBottom: 8,
            }}
          >
            <Text>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width : Dimensions.get('window').width *0.8 }}>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Adicione metas de realizações"
          onSubmitEditing={handleAddTag}
          style={{
            borderWidth: 1,
            borderColor: '#999999',
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 6,
            marginTop: 8,
            marginBottom: 16,
          }}
        />
        <TouchableOpacity onPress={handleAddTag}>
          <AntDesign name="plussquare" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TagInput;