package test.org.neusoft.neubbs.dao;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * 测试所有 DAO 接口
 *
 * @author Suvan
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({
        UserDAOTest.class,
        TopicDAOTest.class,
        TopicContentDAOTest.class,
        TopicCategoryDAOTest.class,
        TopicReplyDAOTest.class
})
public class TestAllDAO { }