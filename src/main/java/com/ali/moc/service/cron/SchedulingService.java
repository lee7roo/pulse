package com.ali.moc.service.cron;

import org.quartz.JobExecutionException;
import org.springframework.transaction.annotation.Transactional;

public class SchedulingService {
	
	@Transactional
	public void sendMail() throws JobExecutionException{
		
		//SendQuestionsEmail.sendMail();
	}

}
