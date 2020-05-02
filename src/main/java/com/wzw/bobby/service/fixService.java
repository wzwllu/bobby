package com.wzw.bobby.service;

import com.wzw.bobby.bean.MathList;

import java.util.ArrayList;
import java.util.List;

/**
 * @ Author     ：wuzhengwei.
 * @ Date       ：Created in 15:49 2020/5/2
 * @ Description：
 * @ Modified By：
 * @Version: $
 */
public class fixService {

    private int add =100;
    private int sub =0;
    private int mutli=0;
    private int div =0;
    private int bigDate=0;
    private int addmax=10;
    private int submax=10;
    private int mutlimax=10;
    private int divmax=10;

    public fixService(int count,int addScale,int subScale,int mutliScale,int divScale,int hard,int addmax,int submax,int mutlimax,int divmax){
        this.bigDate=hard;
        this.addmax = addmax;
        this.submax =submax;
        this.mutlimax= mutlimax;
        this.divmax=divmax;

        this.add = (count*addScale)/100;
        this.sub = (count*subScale)/100;
        this.mutli= (count*mutliScale)/100;
        this.div=(count*divScale)/100;

        int zz = count -this.add -this.sub -this.mutli -this.div;
        if(zz>0){
            if(this.add>0){
                this.add =this.add+zz;
            }else if(this.sub>0){
                this.sub=this.sub+zz;
            }else if(this.mutli>0){
                this.mutli=this.mutli+zz;
            }else if(this.div>0){
                this.div= this.div+zz;
            }
        }


    }



    public List<MathList> makeList() {
        List<MathList> result = new ArrayList<>();
        if(this.add>0){
            result.addAll(new addService(addmax,add,bigDate,bigDate).makeList());
        }
        if(this.sub>0){
            result.addAll(new subService(submax,sub,bigDate,bigDate).makeList());
        }
        if(this.mutli>0){
            result.addAll(new doubleService(mutlimax,mutli,bigDate).makeList());
        }
        if(this.div>0){
            result.addAll(new divService(divmax,div,bigDate).makeList());
        }
//        System.out.println(result.size());
       return result;

    }

    public static void main(String[] args) {
        for(MathList l :new fixService(10,30,30,30,10,80,50,30,10,10).makeList()){
            System.out.println(l.toStr());
        }
    }
}
