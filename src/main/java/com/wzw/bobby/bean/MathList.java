package com.wzw.bobby.bean;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @ Author     ：wuzhengwei.
 * @ Date       ：Created in 13:32 2020/5/2
 * @ Description：
 * @ Modified By：
 * @Version: $
 */
@Data
public class MathList {
    private int[] list = new int[3];
    private int flag;
    private int kong;
    private boolean rightOrWrong;
    private int answer;
    private String showStr="未完成";




    public MathList(int max,int min,int result,int userd){
        list[0]=max;
        list[1]=min;
        list[2]=result;
        flag=userd;
        kong=new Random().nextInt(3);

    }

    public boolean correct(int answer){
        this.answer =answer;
       if(list[kong]==this.answer){
           this.rightOrWrong=true;
       }else{
           this.rightOrWrong=false;
       }
       this.showStr=toStr();
       return this.rightOrWrong;

    }


    public String toStr(){
        List<String> lists = new ArrayList<>();
        for(Integer s: list){
            lists.add(String.valueOf(s));
        }
        lists.set(kong,"("+answer+")");
        StringBuffer sb = new StringBuffer();
        sb.append(lists.get(0));
        if(flag==1){
            sb.append(" + ");

        }else if(flag == 2){
            sb.append(" - ");
        }else if(flag ==3 ){
            sb.append(" X ");
        }else if(flag ==4){
            sb.append(" ÷ ");
        }else {
            return  "max="+list[0]+ " min="+list[1] +"  userd="+flag;
        }
        sb.append(lists.get(1));
        sb.append(" = ");
        sb.append(lists.get(2));


        if(rightOrWrong){
        sb.append("  对");}
        else{
        sb.append("  错");
        }

        return sb.toString();
    }
}
