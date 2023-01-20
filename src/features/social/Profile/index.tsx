import { type User as UserType } from "@prisma/client"
import { Container } from "@src/components/Container";
import { Divider } from "@src/components/Divider";
import { Header } from "@src/components/Header";
import { Stack } from "@src/components/Stack";
import { Paragraph, Title } from "@src/components/Typography";
import { User } from "@src/components/User";
import cls from './Profile.module.scss';

interface ProfileProps {
    user: UserType;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    return (
        <>
            <Header />
            <Container className={cls.root}>
                <Stack
                    direction="column"
                    gap={8}
                >
                    <User
                        user={user}
                        onlyAvatar
                        size={64}
                    />
                    <Title level={2} className={cls.name}>{user.name}</Title>
                    <Paragraph color="secondary">{user.email}</Paragraph>
                </Stack>
                <Divider />
            </Container>
        </>
    )
};
