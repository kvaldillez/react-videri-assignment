import { LoginPageContainer } from './LoginPage';

describe('LoginPage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <LoginPageContainer isLoggedIn={false} loading={false} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('has all input fields', () => {
    const wrapper = mount(
      <LoginPageContainer isLoggedIn={false} loading={false} />
    );
    let fields = wrapper.find('form').find('input').length;
    expect(fields).toEqual(2);
  });

  it('has a submit form button', () => {
    const wrapper = mount(
      <LoginPageContainer isLoggedIn={false} loading={false} />
    );
    let button = wrapper.find('form').find('button[type="submit"]').length;
    expect(button).toEqual(1);
  });

  it('accepts valid username input', () => {
    const wrapper = mount(
      <LoginPageContainer isLoggedIn={false} loading={false} />
    );
    wrapper
      .instance()
      .handleChangeInput(
        { target: { value: '1first_name+last-name@subdomain.domain.com' } },
        'username'
      );
    expect(wrapper.state().formControls.username.valid).toEqual(true);
  });

  it('rejects invalid username input', () => {
    const wrapper = mount(
      <LoginPageContainer isLoggedIn={false} loading={false} />
    );
    wrapper
      .instance()
      .handleChangeInput(
        { target: { value: 'email.@domain.com' } },
        'username'
      );
    expect(wrapper.state().formControls.username.valid).toEqual(false);
  });

  it('accepts valid password input', () => {
    const wrapper = mount(
      <LoginPageContainer isLoggedIn={false} loading={false} />
    );
    wrapper
      .instance()
      .handleChangeInput({ target: { value: 'Aa11%$cccc' } }, 'password');
    expect(wrapper.state().formControls.password.valid).toEqual(true);
  });

  it('rejects invalid password input', () => {
    const wrapper = mount(
      <LoginPageContainer isLoggedIn={false} loading={false} />
    );
    wrapper
      .instance()
      .handleChangeInput({ target: { value: '!Ba%$dkj' } }, 'password');
    expect(wrapper.state().formControls.password.valid).toEqual(false);
  });

  it('shows error message when invalid username form submission', () => {
    const wrapper = mount(
      <LoginPageContainer isLoggedIn={false} loading={false} />
    );
    wrapper
      .instance()
      .handleChangeInput(
        { target: { value: 'email.@domain.com' } },
        'username'
      );
    wrapper.find('form').simulate('submit');
    expect(wrapper.state().displayErrorMessage).toEqual(true);
  });

  it('shows error message when invalid password form submission', () => {
    const wrapper = mount(
      <LoginPageContainer isLoggedIn={false} loading={false} />
    );
    wrapper
      .instance()
      .handleChangeInput({ target: { value: '!Ba%$dkj' } }, 'password');
    wrapper.find('form').simulate('submit');
    expect(wrapper.state().displayErrorMessage).toEqual(true);
  });

  it('shows error message when form is blank on form submission', () => {
    const wrapper = mount(
      <LoginPageContainer isLoggedIn={false} loading={false} />
    );
    wrapper.find('form').simulate('submit');
    expect(wrapper.state().displayErrorMessage).toEqual(true);
  });
});
