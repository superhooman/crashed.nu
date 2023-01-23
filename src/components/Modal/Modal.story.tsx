import { EyeClosedIcon, EyeOpenIcon, LockClosedIcon, PersonIcon, UpdateIcon } from '@radix-ui/react-icons';
import React from 'react';

import type { Meta } from '@storybook/react';

import { Button } from '../Button';
import { Input } from '../Input';
import { Stack } from '../Stack';
import { Text } from '../Typography';

import { Modal, ModalDescription, ModalTitle } from './index';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    open: false,
  }
};

export default meta;

export const Default = () => {
  const [open, setOpen] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);

  const toggleShowPass = React.useCallback(() => {
    setShowPass((prev) => !prev);
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTitle>Almost there!</ModalTitle>
        <ModalDescription>Let&apos;s get your schedule from registrar</ModalDescription>
        <Stack
          direction="column"
          gap={8}
          grow={1}
        >
          <Input value="abylaikhan.kazymbetov" disabled fullWidth icon={<PersonIcon />} />
          <Stack gap={8}>
            <Input placeholder="Registrar password" type={showPass ? 'text' : 'password'} fullWidth icon={<LockClosedIcon />} />
            <Button onClick={toggleShowPass} type="button" icon={showPass ? <EyeOpenIcon /> : <EyeClosedIcon />} />
          </Stack>
          <Button
            type="submit"
            variant="primary"
            icon={<UpdateIcon />}
            fullWidth
          >
            Sync with registrar
          </Button>
          <Text size="small" color="secondary">We don&apos;t store your credentials. You are sending it to the registrar using our API just to get schedule.</Text>
        </Stack>
      </Modal>
    </>
  );
};
