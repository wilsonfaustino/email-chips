import { useState } from 'react'
import { Button, Center, Code, Container, Divider, Heading, Text, useBreakpointValue, useClipboard } from '@chakra-ui/react'
import { InputMail } from './InputMail'

function App() {
    const [formState, setFormState] = useState<string[]>([])
    const [value] = useState('To: John Doe <john.doe@gmail.com> Cc: Jane Doe <jane.doe@gmail.com>')
    // chakra hooks
    const { hasCopied, onCopy } = useClipboard(value)
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <Container
            minW={isWideVersion ? 1000 : '90%'}
            bgColor='gray.100'
            mt='10'
            borderRadius='lg'
            p='8'
        >
            <Heading>Implementação de Email Chips</Heading>
            <Divider my='6' borderColor='gray.500' />
            <InputMail
                name='contactlist'
                label='Lista de contatos (label opcional)' 
                value={formState}
                onChange={setFormState}
            />

            <Center
                w='100%'
                p='6'
                mt='5'
                borderRadius='md'
                borderStyle='dashed'
                borderColor='purple.200'
                borderWidth='2px'
                bgColor='white'
            >
                <Text>Exemplo para teste da função colar:{` `}
                    <Code colorScheme='purple' onClick={onCopy}>
                        {value}
                    </Code>
                </Text>
                <Button onClick={onCopy} ml={2} variant='outline'>
                    {hasCopied ? "Copiado" : "Copiar"}
                </Button>
            </Center>

        </Container>
    )
}

export default App
