package com.wzw.bobby.service;

import com.wzw.bobby.bean.MathList;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @ Author     ：wuzhengwei.
 * @ Date       ：Created in 13:26 2020/5/2
 * @ Description：
 * @ Modified By：
 * @Version: $
 */

public class addService {
    private int max =10;
    private int count =100;
    private int  breakNumPoint = 50;
    private int balance = 30;
    public addService(int max,int count){
        this.max=max;
        this.count=count;
    }

    public addService(int max,int count,int breakNumPoint,int balance){
        this.max=max;
        this.count=count;
        this.breakNumPoint = breakNumPoint;
        this.balance= balance;
    }

    public List<MathList> makeList(){
        List<MathList> result= new ArrayList<>();

        while (result.size()<count){
            int outcome = new Random().nextInt(max+1);
            int addendMax = new Random().nextInt(outcome+1);
            int addendMin = outcome -addendMax;
            MathList mathList= new MathList(addendMax,addendMin,outcome,1);
            if(outcome<(max/2)){
                    if(new Random().nextInt(100) < breakNumPoint ){
                         continue;
                    }

            }
            if(((addendMin%10)+(addendMax%10))<10){
                if(new Random().nextInt(100) < balance ){
                    continue;
                }
            }

            result.add(mathList);
        }
//        System.out.println(result.size()+"size");
       return result;
    }

    public static void main(String[] args) {
        for(MathList l :new addService(20,100,100,100).makeList()){
            System.out.println(l.toStr());
        }
    }
}
