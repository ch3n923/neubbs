package org.neusoft.neubbs.service;

/**
 * Redis数据库 Service接口
 */
public interface IRedisService {
    public void saveByKeyValue(String key, String value);
    public void saveByKeyValueTime(String key, String value, long time);

    public void removeByKey(String key);

    public String getValueByKey(String key);
    public long getExpireTimeByKey(String key);

    public void updateByKeyValue(String key, String value);
}