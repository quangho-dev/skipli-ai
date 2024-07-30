import { Route, Routes as Twitch } from 'react-router-dom'
import RegisterPhoneNumberScreen from '../../screens/RegisterPhoneNumberScreen';

const Routes = (props) => {
  return (
    <section>
      <Twitch>
        <Route path="/" element={RegisterPhoneNumberScreen} />
      </Twitch>
    </section>
  );
};

export default Routes