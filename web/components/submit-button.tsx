import Spinner from '@/components/spinner';
import { Button, ButtonProps } from '@/components/ui/button';

export interface SubmitButtonProps extends ButtonProps {
  name: string;
  isSubmitting: boolean;
}

const SubmitButton = ({
  type,
  name,
  isSubmitting,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button type={type ?? 'submit'} {...props} disabled={isSubmitting}>
      {isSubmitting ? <Spinner /> : name}
    </Button>
  );
};

export default SubmitButton;
