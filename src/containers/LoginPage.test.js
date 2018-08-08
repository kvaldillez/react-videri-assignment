import { LoginPageContainer } from './LoginPage';

describe('LoginPage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LoginPageContainer loading={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('has all input fields', () => {
    const wrapper = mount(<LoginPageContainer loading={false} />);
    let fields = wrapper.find('form').find('input').length;
    expect(fields).toEqual(2);
  });

  it('has a submit form button', () => {
    const wrapper = mount(<LoginPageContainer loading={false} />);
    let button = wrapper.find('form').find('button[type="submit"]').length;
    expect(button).toEqual(1);
  });
});
