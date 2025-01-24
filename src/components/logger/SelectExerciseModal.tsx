import { FlatList, Modal, Pressable, StyleSheet } from 'react-native';
import { View, Text, TextInput } from '@/components/general/Themed';
import React, { useState } from 'react';
import CustomButton from '@/components/general/CustomButton';
import Card from '@/components/general/Card';
import { AntDesign } from '@expo/vector-icons';
import exercices from '@/data/exercices';

type SelectExerciseModalProps = {
  onSelectExercise: (name: string) => void;
};

export default function SelectExerciseModal({
  onSelectExercise,
}: SelectExerciseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredExercices = exercices.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <CustomButton
        title="Select exercise"
        onPress={() => setIsOpen(true)}
        style={{ marginBottom: 15 }}
      />
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.overlay}>
          <Card title="Select exercise" style={styles.modalContent}>
            <AntDesign
              name="close"
              onPress={() => setIsOpen(false)}
              size={24}
              color="gray"
              style={styles.closeButton}
            />

            <TextInput
              placeholder="Search ..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
            <FlatList
              data={filteredExercices}
              contentContainerStyle={{ gap: 10 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    gap: 3,
                  }}
                  onPress={() => {
                    //notify the parent about the selected exercise
                    onSelectExercise(item.name);
                    setIsOpen(false);
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                  <Text style={{ color: 'gray' }}>{item.muscle}</Text>
                </Pressable>
              )}
            />
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  input: {
    padding: 10,

    marginVertical: 10,
  },
});
