
export interface InputProps{
    name: string
    label?: string
    value: string[]
    onChange: (value: string[]) => void
}

export interface UseEmailChipProps {
    value: string[];
    onChange: (values: string[]) => void;
  }