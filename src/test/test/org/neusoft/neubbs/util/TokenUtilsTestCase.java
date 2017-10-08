package test.org.neusoft.neubbs.util;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.neusoft.neubbs.constant.TokenInfo;
import org.neusoft.neubbs.entity.UserDO;
import org.neusoft.neubbs.util.TokenUtils;


/**
 * TokenUtils类 测试用例
 */
@RunWith(JUnit4.class)
public class TokenUtilsTestCase {

    /**
     * 测试Token 加密与解密
     */
    @Test
    public void testTokenEncryptionDecrypted(){
        UserDO user = new UserDO();
        UserDO veruser = new UserDO();
        String token = null;
        String username = null;
        try {
            //获取加密token
            user.setName("testCast");
            token = TokenUtils.createToken(user);
            System.out.println("token:" + token);

            //休眠1s，让token失效
            Thread.sleep(1000);

            //根据密钥，解密token，获取用户名
            veruser = TokenUtils.verifyToken(token, TokenInfo.SECRET_KEY);
            if(veruser == null){
                System.out.println("token已经过期，无法解密");
            }else{
                System.out.println("username: " + veruser.getName());
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}