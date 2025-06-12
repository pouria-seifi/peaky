import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Image from 'next/image'
import { User, Password } from 'react-iconly'
import { apiLogin } from '../../apis/apiRegister';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router'
import useIsMounted from "../useIsMounted"
import Loading from "../loading/Loading";
import Cookies from "universal-cookie";

const Login = () => {
    const isMounted = useIsMounted();
    const [loginLoading, setLoginLoading] = useState(false)


    const router = useRouter()
    const cookies = new Cookies();

    const postLoginData = (data) => {
        setLoginLoading(true)
        const trimedData = {
            password: data.password.trim(),
            username: data.username.trim(),
        }
        apiLogin(trimedData)
            .then((result) => {
                if (!isMounted()) return;
                const { statusCode, success, token, msg } = result
                setLoginLoading(false)
                if (success && statusCode === 200) {
                    message.success(msg)
                    cookies.set('peakyToken', token)
                    router.push("/eventTypes")
                    return
                }
                message.warning(msg)
            })
            .catch((err) => {
                if (!isMounted()) return;
                message.error("ارتباط با سرور با مشکل مواجه شد")
                setLoginLoading(false)
                console.error(err)
            })
    }

    return (
        <Layout
            bodyIdStyle="LoginPage"
        >
            {
                loginLoading && <Loading />
            }
            <div className="row w-100 h-100">
                <section className="col-12 col-md-6">
                    <div className="formWrapper">
                        <Form
                            name="registerForm"
                            onFinish={postLoginData}
                            autoComplete="off"
                            layout="vertical"
                            className="registerForm"
                        >
                            <p>به Peaky خوش آمدید</p>
                            <Form.Item
                                label="نام کاربری"
                                name="username"
                                rules={[
                                    { required: true, message: 'این فیلد الزامی است' },
                                    { pattern: new RegExp(/^[0-9]*$/), message: 'لطفا با کیبورد انگلیسی بنویسید' },
                                ]}
                            >
                                <Input
                                    prefix={<User />}
                                />
                            </Form.Item>

                            <Form.Item
                                label="رمز عبور"
                                name="password"
                                rules={[
                                    { required: true, message: 'این فیلد الزامی است' },
                                    { pattern: new RegExp(/^[0-9]*$/), message: 'لطفا با کیبورد انگلیسی بنویسید' },
                                ]}
                            >
                                <Input.Password
                                    prefix={<Password />}
                                />
                            </Form.Item>

                            <Form.Item
                                className="mb-2"
                            >
                                <Button
                                    className="mainColor1Button"
                                    htmlType="submit"
                                    disabled={loginLoading}
                                >ورود
                                </Button>
                            </Form.Item>
                            <p>حساب کاربری ندارید؟
                                <span
                                    onClick={() => router.push("/register")}
                                    className="colorMaincolor1 cursor-pointer"
                                >ثبت نام کنید</span>
                            </p>
                        </Form>
                    </div>
                </section>

                <section className="col-12 col-md-6 h-100 illusWrapper">
                    <div className="illus">
                        <Image
                            src="/illus/login-bro.svg"
                            alt="Picture of the author"
                            layout='fill'
                        // placeholder="blur"
                        />
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Login;