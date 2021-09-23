import React from 'react'
import { 
    Center,
    FormControl, 
    FormErrorMessage, 
    FormLabel, 
    Input as ChakraInput,
    Tag,
    TagCloseButton,
    TagLabel, 

 } from '@chakra-ui/react'
import { InputProps } from './types'
import { useChips } from './hooks'

export const InputMail = (props: InputProps) => {
    const { label, name, value, onChange } = props
    const { chips } = useChips({
        value,
        onChange
    })
    return (
        <FormControl isInvalid={chips.hasError}>
            {!!label && <FormLabel>{label}</FormLabel>}
            <ChakraInput 
                id={name}
                name={name}
                borderColor='purple.100'
                focusBorderColor="purple.500"
                bgColor='white'
                variant="filled"
                _hover={{
                  bgColor: 'gray.200',
                }}
                size="lg"
                value={chips.value}
                onChange={e => chips.handleChange(e.target.value)}
                onKeyDown={(e) => {
                    if (["Enter", "Tab", ","].includes(e.key)) {
                      e.preventDefault()
                      chips.handleKeyDown(e.key, e.currentTarget.value)
                    }
                  }}
                onPaste={e => {
                    e.preventDefault()
                    chips.handlePaste(e.clipboardData.getData('text'))
                }}
                placeholder='Digite ou cole endereços de e-mail e tecle `Enter`'
            />
            {chips.hasError && <FormErrorMessage>{chips.error}</FormErrorMessage>}
            <Center mt='5'>
                {value?.map(chip => (
                    <Tag key={chip} size='md' borderRadius='full' variant='solid' mx='1'>
                        <TagLabel>{chip}</TagLabel>
                        <TagCloseButton onClick={() => chips.deleteChip(chip)} />
                    </Tag>
                ))}
            </Center>
        </FormControl>
    )
}
