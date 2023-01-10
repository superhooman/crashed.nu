import { Text } from "../Typography";

const LINK = "https://superhooman.co/" //"https://t.me/iamsuperhooman";

export const Copyright = () => <Text align="center" size="small" color="secondary">Made by <a href={LINK}><Text size="small" color="primary">superhooman</Text></a> with ❤️</Text>;
