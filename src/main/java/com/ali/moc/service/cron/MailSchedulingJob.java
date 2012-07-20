package com.ali.moc.service.cron;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class MailSchedulingJob extends QuartzJobBean {

	protected ApplicationContext applicationContext;
	
	public void setApplicationContext(ApplicationContext applicationContext) {
		this.applicationContext = applicationContext;
	}

	@Override
	protected void executeInternal(JobExecutionContext context)
			throws JobExecutionException {

		SchedulingService scheduleService = (SchedulingService) applicationContext.getBean(
				"schedulingService", SchedulingService.class);
		scheduleService.sendMail();

	}

}
