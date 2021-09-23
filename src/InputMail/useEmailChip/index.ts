import { useCallback, useRef, useState } from 'react'
import { isEmail, isInList } from '../../utils'
import { UseEmailChipProps } from '../types'


export const useEmailChip = (props: UseEmailChipProps) => {
    const onChangeRef = useRef(props.onChange)
    onChangeRef.current = props.onChange

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const hasError = error !== null

    // Validations ------------------------------------

    const isValid = useCallback((email: string) => {
        let errorField = null

        if (!isEmail(email)) {
            errorField = `${email} não é um endereço de email válido`
        }

        if (isInList(email, props.value)) {
            errorField = `${email} já está na lista`
        }

        if (errorField) {
            setError(errorField)
            return false
        }
        return true
    }, [props.value])

    // Functions -> handle changes in input field
    const handleChange = useCallback((value: string) => {
        setInputValue(value)
        setError(null)
    }, [])

    // Functions -> handle keyDown Event
    const handleKeyDown = useCallback((key: string, value: string) => {

        if(['Enter', 'Tab', ','].includes(key)) {

            let email = value.trim()

            if(email && isValid(email)) {
                onChangeRef.current([...props.value, email])
                setInputValue('')
            }
        }
    }, [props.value, isValid])

    // Functions -> handle Paste Event
    const handlePaste = (value: string) => {
        setInputValue(value)
        const emails = value.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g)

        if (emails) {
            const checkedInList = emails.filter(email => !isInList(email, props.value))
            const toBeAdded = [...new Set(checkedInList)]

            props.onChange([...props.value, ...toBeAdded])
        }
        setInputValue('')
    }

    // Functions -> handle delete an item from chips list
    const deleteChip = useCallback((toBeRemoved) => {
        const newList = props.value.filter((email) => email !== toBeRemoved)
        onChangeRef.current(newList)
    }, [props.value])

    
    

    return {
        deleteChip,
        error,
        handleChange,
        handleKeyDown,
        handlePaste,
        hasError,
        value: inputValue
    }
}