package com.wzw.bobby.service;

import com.wzw.bobby.bean.MathList;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @ Author     ：wuzhengwei.
 * @ Date       ：Created in 14:50 2020/5/2
 * @ Description：
 * @ Modified By：
 * @Version: $
 */
public class divService {
    private int max =10;
    private int count =100;
    private int  breakNumPoint = 50;
    public divService(int max, int count){
        this.max=max;
        this.count=count;
    }

    public divService(int max, int count, int breakNumPoint){
        this.max=max;
        this.count=count;
        this.breakNumPoint = breakNumPoint;
    }

    public List<MathList> makeList(){
        List<MathList> result= new ArrayList<>();

        while (result.size()<count){
            int addendMax = new Random().nextInt(max+1);
            int addendMin = new Random().nextInt(max+1);
            int outcome = addendMax * addendMin ;
            MathList mathList= new MathList(outcome,addendMax,addendMin,4);
            if(addendMax==0 || addendMin==0){
                continue;
            }
            if(addendMax<(max/2) || addendMin<(max/2)){
                if(new Random().nextInt(100) < breakNumPoint ){
                    continue;
                }

            }

            result.add(mathList);
        }
//        System.out.println(result.size()+"size");
        return result;
    }

    public static void main(String[] args) {
        for(MathList l :new divService(10,100,100).makeList()){
            System.out.println(l.toStr());
        }
    }
}
