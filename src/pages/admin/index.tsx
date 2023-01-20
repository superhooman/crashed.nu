import { ROUTES } from "@src/constants/routes";
import { getServerAuthSession } from "@src/server/common/get-server-auth-session";
import type { GetServerSideProps, NextPage } from "next";
import { prisma } from '@src/server/db/client';
import { UserType } from "@prisma/client";
import { Container } from "@src/components/Container";
import { Header } from "@src/components/Header";
import { trpc } from "@src/utils/trpc";
import { Card } from "@src/components/Card";
import { Text, Title } from "@src/components/Typography";
import { Stack } from "@src/components/Stack";
import { Button } from "@src/components/Button";
import { Empty } from "@src/components/Empty";
import { Input } from "@src/components/Input";
import React from "react";
import { Divider } from "@src/components/Divider";

const Admin: NextPage = () => {
    const { data: subs } = trpc.admin.subs.useQuery();
    const { admin } = trpc.useContext();

    const [name, setName] = React.useState('');
    const [slug, setSlug] = React.useState('');

    const handleNameChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
        setName(e.target.value);
    }, []);

    const handleSlugChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
        setSlug(e.target.value);
    }, []);

    const { mutateAsync: createSub } = trpc.admin.addSub.useMutation({
        onSuccess: () => {
            setName('');
            setSlug('');
            admin.subs.invalidate();
        }
    });

    const handleSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();
        createSub({
            name,
            slug,
        })
    }, [name, slug, createSub]);

    return (
        <Container
            noHeight
            style={{
                paddingTop: 24,
                paddingBottom: 24,
                maxWidth: 600,
            }}
        >
            <Header fixed sub="admin" />
            <Card>
                <Title level={3}>Subs</Title>
                <Divider />
                {subs?.length ? subs.map((sub, i) => (
                    <>
                        {i > 0 ? <Divider /> : null}                    
                        <Stack key={sub.slug} alignItems="center" justifyContent="space-between">
                            <Stack direction="column">
                                <Text bold>{sub.name}</Text>
                                <Text size="small" color="secondary">{sub.slug}</Text>
                            </Stack>
                            <Button>Delete</Button>
                        </Stack>
                    </>
                )) : <Empty />}
                <Divider />
                <form onSubmit={handleSubmit}>
                    <Stack direction="column" gap={8}>
                        <Title level={4}>Create new</Title>
                        <Input value={name} onChange={handleNameChange} placeholder="Name" />
                        <Input value={slug} onChange={handleSlugChange} placeholder="Slug" />
                        <Button type="submit" variant="primary">Create</Button>
                    </Stack>
                </form>
            </Card>
        </Container>
    );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);

    if (!session || !session.user) {
        return {
            redirect: {
                destination: ROUTES.AUTH.get(),
                permanent: false,
            }
        }
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });

    if (!user) {
        return {
            redirect: {
                destination: ROUTES.AUTH.get(),
                permanent: false,
            }
        }
    }

    if (user.userType !== UserType.ADMIN) {
        return {
            redirect: {
                destination: ROUTES.HOME.get(),
                permanent: false,
            }
        }
    }

    return {
        props: {
            session,
        }
    }
};