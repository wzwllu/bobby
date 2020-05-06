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

    private static Map<String, Map<String, Object>> old = new HashMap<>();

    @Scheduled(fixedRate=60*60*1000)
    private void clearOld(){
        List<String> keys = new ArrayList<>();
        for(String key:old.keySet()){
           Object oldtime = old.get(key).get("time");
           if(oldtime!=null) {
               if ((System.currentTimeMillis() - (long) oldtime) > 60 * 60 * 1000) {
                   keys.add(key);
               }
           }
        }
        for(String k:keys){
            userList.remove(k);
            old.remove(k);
            System.out.println("clear"+k);
        }
    }

    public static void addTime(String key){
        Map<String,Object> map = old.get(key);
        if(map==null) {
            Map<String, Object> map2 = new HashMap<>();
            map2.put("time", System.currentTimeMillis());
            map2.put("do",0);
            old.put(key, map2);
        }else{
            map.put("time", System.currentTimeMillis());
            map.put("do",0);
        }
    }

    public static long theTime(String key){

        if(old.get(key)!=null && old.get(key).get("time")!=null) {
            return System.currentTimeMillis() - (long)old.get(key).get("time");
        }else{
            return -1;
        }
    }

    public static int theDo(String key,boolean show){
        int thno = -1;
        if(old.get(key)!=null && old.get(key).get("do")!=null) {
            thno=(int) old.get(key).get("do");
            int size = userList.get(key).size();
            if(thno < size){
                if(!show) {
                    old.get(key).put("do", thno + 1);
                }
            }else{
                thno =-1;
            }

        }
     return thno;


    }

    public static List<MathList> showList(String key){
        return userList.get(key);
    }

    public static void addList(String key ,List<MathList> list){
        addTime(key);
//        old.put(key,System.currentTimeMillis());
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
        theDo(userid,false);
        MathList mathList = showCurMathList(userid,i);
        if(mathList!=null){
            mathList.correct(ans);
        }
    }

}
