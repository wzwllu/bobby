package com.wzw.bobby.service;

import com.wzw.bobby.bean.MathList;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ Author     ：wuzhengwei.
 * @ Date       ：Created in 19:24 2020/5/2
 * @ Description：
 * @ Modified By：
 * @Version: $
 */
@EnableScheduling
public class doMathService {
    private static Map<String, List<MathList>> userList = new HashMap<>();

    private static Map<String, Long> old = new HashMap<>();

    @Scheduled(fixedRate=60*60*1000)
    private void clearOld(){
        List<String> keys = new ArrayList<>();
        for(String key:old.keySet()){
           if((System.currentTimeMillis()-old.get(key))>60*60*1000){
               keys.add(key);
           }
        }
        for(String k:keys){
            userList.remove(k);
            old.remove(k);
        }
    }

    public static List<MathList> showList(String key){
        return userList.get(key);
    }

    public static void addList(String key ,List<MathList> list){
        old.put(key,System.currentTimeMillis());
        userList.put(key,list);
    }

    public static MathList showCurMathList(String userid,int i){
        List<MathList> list = showList(userid);
        if(list!=null ){
            MathList mathList = list.get(i);
            if(mathList!=null){
                return  mathList;
            }
        }
        return null;
    }

    public static void ansMath(int ans,String userid,int i){

        MathList mathList = showCurMathList(userid,i);
        if(mathList!=null){
            mathList.correct(ans);
        }
    }

}
