import { UseEmailChipProps } from './types'
import { useEmailChip } from './useEmailChip'

export const useChips = (props: UseEmailChipProps) => {
    const chips = useEmailChip(props)

    return {
        chips
    }
}