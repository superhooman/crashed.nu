import { Container } from "@src/components/Container";
import { Head } from "@src/components/Head";
import { Header } from "@src/components/Header";
import { Paragraph, Title } from "@src/components/Typography";

export default function Privacy() {
    return (
        <>
            <Head
                title="crashed.nu - privacy"
                description="Privacy policy for crashed.nu"
                url="https://crashed.nu/privacy"
            />
            <Container style={{
                paddingTop: 32,
                paddingBottom: 32,
                maxWidth: 720,
            }} noHeight>
                <Header sub="privacy" fixed />
                <Title gutterBottom>Privacy Policy</Title>
                <Paragraph color="secondary" gutterBottom>
                    At crashed, accessible from crashed.nu, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by crashed and how we use it.
                </Paragraph>
                <Paragraph color="secondary" gutterBottom>
                    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                </Paragraph>
                <Paragraph color="secondary" gutterBottom>
                    This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in crashed. This policy is not applicable to any information collected offline or via channels other than this website.
                </Paragraph>
                <Title level={2} gutterBottom>Consent</Title>
                <Paragraph color="secondary" gutterBottom>
                    By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </Paragraph>
                <Title level={2} gutterBottom>Information we collect</Title>
                <Paragraph color="secondary" gutterBottom>
                    The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                </Paragraph>
                <Paragraph color="secondary" gutterBottom>
                    If you contact us directly, we may receive additional information about you such as your name and/or email address the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                </Paragraph>
                <Paragraph color="secondary" gutterBottom>
                    When you register for an Account, we may ask for your contact information, including items such as name and/or email address.
                </Paragraph>
                <Title level={2} gutterBottom>Cookies and Web Beacons</Title>
                <Paragraph color="secondary" gutterBottom>
                    Like any other website, crashed uses &lsquo;cookies&rsquo;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
                </Paragraph>
            </Container>
        </>
    )
}