import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export type Props = {
    navigation: HomeScreenNavigationProp;
};