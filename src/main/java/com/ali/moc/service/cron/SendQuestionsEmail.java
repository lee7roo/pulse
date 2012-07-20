package com.ali.moc.service.cron;

import java.io.File;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import sun.misc.BASE64Encoder;

public class SendQuestionsEmail {
	
	  public static void sendMail(){
		  // 确定要发送的邮件服务器的地址 
	      //开发测试环境地址：  incmta1.alibaba-inc.com
		  //线上环境地址：vip-smtp.vip.xyi.cn.alidc.net   
		  String mailserver = "incmta1.alibaba-inc.com"; 
	        
	        // 设置邮件的传输协议 
	        try { 
	            Properties prop = System.getProperties(); 
	            prop.put("mail.smtp.host", mailserver); 
	            // 建立邮件发送的连接 
	            Session session = Session.getDefaultInstance(prop, null); 
	            // 创建发送的信息的载体 
	            Message msg = new MimeMessage(session); 
	            // 设置相关的邮件属性 
	            BASE64Encoder enc = new BASE64Encoder();
	            String fromName = new String("NOC-考试平台".getBytes("UTF-8"),Charset.defaultCharset());  
	            msg.setFrom(new InternetAddress("noc-exam@alibaba-inc.com","=?UTF-8?B?" + enc.encode(fromName.getBytes()) + "?=")); 
	            // 点到点的发送 
	            msg.setRecipient(Message.RecipientType.TO, new InternetAddress("b2b-noc@list.alibaba-inc.com")); 
	            msg.setRecipient(Message.RecipientType.CC, new InternetAddress("weiyi.fangwy@alibaba-inc.com"));
	            String subject = new String("考试系统试题收集".getBytes("UTF-8"),Charset.defaultCharset());  
	            msg.setSubject("=?UTF-8?B?" + enc.encode(subject.getBytes()) + "?=");
	            msg.setSentDate(new Date()); 
	            Multipart mp = new MimeMultipart();
	            String htmlContent = "<html><body style='font-size:0.9em;'>" +
	            		"<p style='margin:0px;padding:0px;text-indent:2em;'>亲们，考试系统试题收集开始了，题目数量不得少于8题，其中日常工作相关题目不少于3题，如美国机房dell机器的drac密码，asc部门机器应用启动脚本目录等。技术题目不少于5题，内容请围绕工作相关。</p>"+
	            		"<p style='margin:0px;padding:0px;text-align:right;'>Thanks.</p>"+
	            		"<p style='margin:0px;padding:0px;font-size:0.8em;color:#DD4B39;'>请大家在周会之前回复此邮件！（出题模版见附件）</p>"+
	            		"</body></html>";
	            MimeBodyPart contentPart = new MimeBodyPart();
	            contentPart.setContent(htmlContent, "text/html;charset=\"UTF-8\"");
	            
	            MimeBodyPart attachPart = new MimeBodyPart();
	            File file = new File(SendQuestionsEmail.class.getClassLoader().getResource("template.xls").getPath());
	            FileDataSource fds = new FileDataSource(file);
	            attachPart.setDataHandler(new DataHandler(fds));
	            attachPart.setFileName(fds.getName());
	            
	            mp.addBodyPart(contentPart);
	            mp.addBodyPart(attachPart);
	            msg.setContent(mp); 
	            msg.saveChanges();     
	            // 发送 
	            Transport.send(msg); 
	        } catch (Exception e) { 
	        	e.printStackTrace();
	        } 
			System.out.println("send success.");
	  }
}
